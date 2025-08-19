import { User as AuthUser } from 'lucia';

type Entity = {
  userId: string | null | undefined;
};

export const isOwner = (
  authUser: AuthUser | null | undefined,
  entity: Entity | null | undefined
) => {
  if (!authUser || !entity) return false;

  if (!entity.userId) return false;

  return authUser.id === entity.userId;
};
