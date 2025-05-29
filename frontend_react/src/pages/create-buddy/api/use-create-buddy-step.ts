import type { FileRoutesByTo } from '@/route-tree.gen';
import { useLocation } from '@tanstack/react-router';

const steps: {
  pathname: keyof FileRoutesByTo;
  motionId?: number;
  faceId?: number;
  size?: 'medium' | 'large-top' | 'large-bottom';
}[] = [
  { pathname: '/create-buddy' },
  { pathname: '/create-buddy/nickname' },
  { pathname: '/create-buddy/hair', motionId: 1, faceId: 1, size: 'large-top' },
  {
    pathname: '/create-buddy/clothes',
    motionId: 2,
    faceId: 5,
    size: 'large-bottom',
  },
  { pathname: '/create-buddy/color', motionId: 1, faceId: 3 },
  { pathname: '/create-buddy/buddy-name', motionId: 2, faceId: 6 },
];

export const useCreateBuddyStep = () => {
  const pathname = useLocation({ select: (location) => location.pathname });
  const currentStep = steps.findIndex((step) => step.pathname === pathname);
  const nextStep = steps[currentStep + 1];

  return {
    currentStep,
    nextStep,
    ...steps[currentStep],
  };
};
