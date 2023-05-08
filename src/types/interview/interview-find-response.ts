import { InterviewResponse } from './interview-response';
import { PageMeta } from '../pagination/page-meta';

export interface InterviewFindResponse {
  data: InterviewResponse[];
  meta: PageMeta;
}
