"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import LogoutButton from "@/components/logoutbutton";
import { saveProfile, checkUsername } from "@/app/actions/profile";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

const profileFormSchema = z.object({
  fullname: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(128).optional().default(""),
  bgImage: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm(profileInfo: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  const defaultValues: Partial<ProfileFormValues> = {
    fullname: profileInfo.info.name,
    username: profileInfo.info.userinfo.accountId,
    email: profileInfo.info.email,
    bio: profileInfo.info.userinfo.bio ?? "",
    bgImage: profileInfo.info.userinfo.bgImage ?? "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const checkUsernameAvailability = useDebouncedCallback(async (username: string) => {
    if (username.length < 2) {
      setUsernameAvailable(null);
      return;
    }

    try {
      setIsCheckingUsername(true);
      const result = await checkUsername(username);
      setUsernameAvailable(result.available);
    } catch (error) {
      console.error('Failed to check username:', error);
      setUsernameAvailable(null);
    } finally {
      setIsCheckingUsername(false);
    }
  }, 500);

  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsSubmitting(true);
      await saveProfile({
        fullname: data.fullname,
        username: data.username,
        bio: data.bio || "",
        bgImage: data.bgImage || "",
      });

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          typeof error === "string"
            ? error
            : "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                Name displayed on the profile page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Username"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      checkUsernameAvailability(e.target.value);
                    }}
                    className={`${
                      isCheckingUsername ? 'pr-12' : 'pr-8'
                    } ${
                      usernameAvailable === true ? 'border-green-500' : 
                      usernameAvailable === false ? 'border-red-500' : ''
                    }`}
                  />
                  <div className="absolute right-3 top-2.5">
                    {isCheckingUsername ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : usernameAvailable === true ? (
                      <span className="text-green-500">✓</span>
                    ) : usernameAvailable === false ? (
                      <span className="text-red-500">✗</span>
                    ) : null}
                  </div>
                </div>
              </FormControl>
              <FormDescription className="flex items-center gap-2">
                {isCheckingUsername ? (
                  "Checking availability..."
                ) : usernameAvailable === true ? (
                  <span className="text-green-500">Username is available!</span>
                ) : usernameAvailable === false ? (
                  <span className="text-red-500">Username is already taken</span>
                ) : (
                  "Unique userid that determines your link as well."
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormDescription>
                This is your email id linked to this account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Bio is visible your custom link page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bgImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bg Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add your bg image url here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The link added here is shown as the background image on your
                profile page
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Update profile"
          )}
        </Button>
      </form>
      <LogoutButton />
    </Form>
  );
}
