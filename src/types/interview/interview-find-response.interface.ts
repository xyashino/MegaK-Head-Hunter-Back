import { InterviewRelationResponse, PageMeta } from '@types';

export interface InterviewFindResponse {
  data: InterviewRelationResponse[];
  meta: PageMeta;
}
