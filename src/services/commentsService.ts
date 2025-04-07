import { UpdateCommentDTO } from '../DTO/commentDTO';
import NotFoundError from '../lib/errors/NotFoundError';
import { findById } from '../repositories/authRepository';
import { deleteComment, updateComment } from '../repositories/commentRepository';

export async function updateCommentService(
  id: number,
  data: UpdateCommentDTO,
): Promise<UpdateCommentDTO> {
  const existingComment = await findById(id);
  if (!existingComment) {
    throw new NotFoundError('comment', id);
  }

  return await updateComment(id, data);
}

export async function deleteCommentService(id: number) {
  const existingComment = await findById(id);
  if (!existingComment) {
    throw new NotFoundError('comment', id);
  }

  return await deleteComment(id);
}
