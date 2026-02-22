import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { axiosInstance } from '@/config/axiosConfig';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { z } from 'zod';

const addEditShopSchema = z.object({
  shop_name: z
    .string()
    .min(1, "Shop name is required")
    .max(100, "Shop name must be under 100 characters"),

  shop_owner_name: z
    .string()
    .min(1, "Owner name is required")
    .max(100, "Owner name must be under 100 characters"),

  shop_email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),

  shop_logo: z
    .string()
    .optional()
    .or(z.literal("")),

  contact_number: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),

  gstin: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Enter a valid GSTIN"
    )
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .max(500, "Notes must be under 500 characters")
    .optional()
    .or(z.literal("")),

  address: z.object({
    state: z
      .string()
      .min(1, "State is required"),

    district: z
      .string()
      .min(1, "District is required"),

    building_name: z
      .string()
      .min(1, "Building name is required")
      .max(150, "Building name must be under 150 characters"),

    house_no: z
      .string()
      .min(1, "House / Flat number is required")
      .max(20, "House number must be under 20 characters"),

    pin_code: z
      .string()
      .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  }),
});

type AddEditShopValues = z.infer<typeof addEditShopSchema>

export default function AddEditShop() {
  const navigate = useNavigate();
  const { shopId } = useParams<{ shopId: string | undefined }>();

  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<AddEditShopValues>({
    resolver: zodResolver(addEditShopSchema),
    defaultValues: {
      shop_name: "",
      shop_owner_name: "",
      shop_email: "",
      shop_logo: "",
      contact_number: "",
      gstin: "",
      notes: "",
      address: {
        state: "",
        district: "",
        building_name: "",
        house_no: "",
        pin_code: "",
      },
    },
  });

  useEffect(() => {
    if (!shopId) return;
    const fetchShopData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/shops/${shopId}`);
        const data = response?.data;
        if (data) form.reset(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShopData();
  }, [shopId, form]);

  const handleReset = () => {
    form.reset();
    navigate(-1);
  }


  const onSubmit = async (data: AddEditShopValues) => {
    setIsSubmitting(true);
    try {
      const payload = { ...data };
      console.log("payload -->", payload);
      // if (shopId) {
      //   await axiosInstance.patch(`/shops/${shopId}`, payload);
      // } else {
      //   await axiosInstance.post('/shops', payload);
      // }
      handleReset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className='gap-0.5 px-2'>
        <CardTitle className='text-lg font-semibold'>{shopId ? 'Edit Shop' : 'Add New Shop'}</CardTitle>
        <CardDescription className='text-sm text-muted-foreground'>
          {shopId ? 'Edit the shop details' : 'Add a new shop to your account'}
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2'>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Basic information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">
                Basic information
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <FormField
                  control={form.control}
                  name="shop_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shop name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. My Store" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shop_owner_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name of owner" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shop_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shop email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="shop@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact number *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gstin"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>GSTIN</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 27AABCU9603R1ZM"
                          maxLength={15}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shop_logo"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Shop logo URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/logo.png"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Optional notes about this shop"
                          className="min-h-[80px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">
                Address
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Maharashtra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.building_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building / Block name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Building or block name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.house_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>House / Flat number *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 101, A-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.pin_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN code *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="6-digit PIN"
                          maxLength={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="sm:order-first"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {shopId ? 'Saving...' : 'Adding shop...'}
                  </>
                ) : (
                  shopId ? 'Save changes' : 'Add shop'
                )}
              </Button>
            </div>
          </form>
        </Form>
        )}
      </CardContent>
    </Card>
  );
}