import React from 'react'
import { WandSparkles, ChartNoAxesColumn, MailCheck, Calculator, Box } from 'lucide-react';
import { cva } from 'class-variance-authority';


const featureItemVariants = cva(
  'group flex flex-col justify-between gap-10 p-6 last:border-border last:border-b last:border-dashed hover:bg-card hover:bg-card/80 sm:gap-22 md:gap-34 lg:gap-46',
  {
    variants: {
      size: {
        sm: '',
        lg: 'lg:col-span-2',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);


const FEATURES_ITEMS = [
    {
        key: 'ai-invoice-creation',
        icon: WandSparkles,
        title: 'AI Invoice Creation',
        description: 'Paste any text, email or receipt, and let our Ai instantly generate a complete professional invoice for you',
        size: 'lg',
    },
    {
        key: 'advanced-analytics',
        icon: ChartNoAxesColumn,
        title: 'Advanced Analytics',
        description: 'Get smart, actionable insights about your business finances, generated automatically by our Ai analyst',
        size: 'sm',
    },
    {
        key: 'automatic-calculations',
        icon: Calculator,
        title: 'Automatic Calculations',
        description: 'Real-time tax, discount, and total calculations with zero errors',
        size: 'sm',
    },
    {
        key: 'smart-reminders',
        icon: MailCheck,
        title: 'Smart Reminders',
        description: 'Automatically generate polite and effective payment reminder emails for overdue invoices with a single click',
        size: 'sm',
    },
    {
        key: 'easy-invoice-management',
        icon: Box,
        title: 'Easy Invoice Management',
        description: 'Easily manage all your invoices, track payments, and send reminders for overdue payments',
        size: 'sm',
    },
    
]



const Features = () => {
  return (
    <section className='relative w-full pt-10'>
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-2 px-6'>
        <h2 className='max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl'>
          Why Invoice Generator?
        </h2>
        <p className='max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg'>
          Powerful features to run your business, everything you need to manage your invoicing & get paid
        </p>
      </div>

      <div className='w-full border-border border-t border-dashed pb-4'>
        <div className='grid grid-cols-1 divide-x divide-y divide-dashed divide-border text-left sm:grid-cols-2 lg:grid-cols-3'>
          {FEATURES_ITEMS.map((feature) => (
            <div
              className={featureItemVariants({
                size: feature.size as 'sm' | 'lg',
              })}
              key={feature.key}
            >
              <feature.icon className='h-8 w-8 stroke-1 transition-transform hover:rotate-12 hover:scale-125' />
              <div className='flex flex-col'>
                <h3 className='text-xl tracking-tight transition-all'>
                  {feature.title}
                </h3>
                <p className='max-w-xs text-sm text-muted-foreground transition-all'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  )
}



Features.displayName = "Features"

export { Features }
