"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { saveLinks } from "@/app/actions/links";
import { getLinks } from "@/app/actions/links";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SocialLink = {
  baseUrl: string;
  username: string;
};

type FormValues = {
  links: SocialLink[];
};

function SortableLink({ 
  field, 
  index, 
  remove, 
  isSubmitting,
  control,
  fieldsLength 
}: {
  field: any;
  index: number;
  remove: (index: number) => void;
  isSubmitting: boolean;
  control: any;
  fieldsLength: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button type="button" {...listeners} className="cursor-grab text-muted-foreground hover:text-primary">
            ⠿
          </button>
          <div className="text-sm text-muted-foreground">Link {index + 1}</div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => remove(index)}
          className="h-8 px-2 text-muted-foreground hover:text-destructive"
          disabled={isSubmitting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name={`links.${index}.username`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`links.${index}.baseUrl`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/username"
                  type="url"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {index < fieldsLength - 1 && <Separator className="my-4" />}
    </div>
  );
}

export function LinkForm() {
  const [defaultValues, setDefaultValues] = useState<FormValues>({ links: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "links",
    control: form.control,
  });

  useEffect(() => {
    async function fetchLinks() {
      try {
        const links = await getLinks();
        setDefaultValues({ links });
        form.reset({ links });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch links. Please try again.",
          variant: "destructive",
        });
      }
    }

    fetchLinks();
  }, [form]);

  async function onSubmit(data: FormValues) {
    const hasEmptyFields = data.links.some(
      (link) => !link.username || !link.baseUrl,
    );

    if (hasEmptyFields) {
      toast({
        title: "Error",
        description:
          "Username and Base URL cannot be empty. Please delete the link or fill in the required fields.",
        variant: "destructive",
      });
      return;
    }

    const hasInvalidUrls = data.links.some((link) => {
      try {
        new URL(link.baseUrl);
        return false;
      } catch {
        return true;
      }
    });

    if (hasInvalidUrls) {
      toast({
        title: "Error",
        description: "Please enter valid URLs",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await saveLinks(data.links);

      toast({
        title: "Success",
        description: "Links updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          typeof error === "string"
            ? error
            : "Failed to save links. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      
      const newLinks = arrayMove(form.getValues().links, oldIndex, newIndex);
      form.setValue('links', newLinks);
      saveLinks(newLinks).catch((error) => {
        toast({
          title: "Error",
          description: "Failed to update link order. Please try again.",
          variant: "destructive",
        });
      });
    }
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
        <CardDescription>
          Add your social media profiles and usernames.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={fields.map(field => field.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {fields.map((field, index) => (
                    <SortableLink
                      key={field.id}
                      field={field}
                      index={index}
                      remove={remove}
                      isSubmitting={isSubmitting}
                      control={form.control}
                      fieldsLength={fields.length}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>

            {fields.length > 0 && <Separator className="my-6" />}

            <div className="flex flex-col gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => append({ username: "", baseUrl: "" })}
                disabled={isSubmitting}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Link
              </Button>

              {fields.length > 0 && (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
