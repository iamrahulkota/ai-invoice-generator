import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Icons } from '../common/Icons';

const logos = [
  {
    name: 'Vercel',
    icon: Icons.apple,
  },
  {
    name: 'Vercel',
    icon: Icons.gitHub,
  },
  {
    name: 'Vercel',
    icon: Icons.tailwind,
  },
  {
    name: 'Vercel',
    icon: Icons.v0,
  },
  {
    name: 'Google',
    icon: Icons.google,
  },
];

export const Customers = ({ count }: { count: number }) => {
  const closest = Math.floor(count / 50) * 50;

  return (
    <section className='relative flex flex-col items-center justify-between gap-8 p-6 py-8 sm:flex-row sm:gap-16 md:py-10'>
      <p className='text-muted-foreground sm:max-w-sm'>
        {closest}+ brands already use InvoiceGen to automate their billing workflow.
      </p>
      <div className='md:w-[50%]'>
        <Carousel
          opts={{
            align: 'start',
            dragFree: true,
            loop: true,
          }}
        >
          <CarouselContent>
            {logos.map((logo, _index) => (
              <CarouselItem className='basis-1/4 md:basis-1/5' key={logo.name}>
                <div className='flex items-center justify-center'>
                  {/* <img
                    alt={logo.name}
                    className='rounded-md p-1 h-6 w-24 select-none object-contain'
                    height={24}
                    src={logo.light}
                    width={96}
                  /> */}
                  <logo.icon className="h-8 w-14" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
