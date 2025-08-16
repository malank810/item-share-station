import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useAuthGuard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const requireAuth = (action: string = 'perform this action') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: `Please sign in to ${action}.`,
        variant: "default",
      });
      navigate('/auth');
      return false;
    }
    return true;
  };

  return { requireAuth, isAuthenticated: !!user };
};