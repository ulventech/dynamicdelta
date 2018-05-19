import { isEmpty } from 'lodash';
import CONSTANT from './constant';

export function CDNURL(pid, cid) {
  return `${CONSTANT.GLOBAL.API}/v1/cdn/project/${pid}/component/${cid}`;
}

export function BLOGURL(pid, postUUID) {
  if (!isEmpty(postUUID)) {
    return `${CONSTANT.GLOBAL.API}/v1/cdn/project/${pid}/blog/post/${postUUID}`;
  }
  return `${CONSTANT.GLOBAL.API}/v1/cdn/project/${pid}/blog/posts`;
}
