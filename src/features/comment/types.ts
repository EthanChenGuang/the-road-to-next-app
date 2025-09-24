import { Prisma } from '@prisma/client';

export type CommentWithMetadata = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        username: true;
      };
    };
  };
}> & { isOwner: boolean };

export type CommentWithHistory = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        username: true;
        email: true;
      };
    };
    history: {
      include: {
        user: {
          select: {
            id: true;
            username: true;
            email: true;
          };
        };
      };
    };
  };
}> & { isOwner: boolean };
