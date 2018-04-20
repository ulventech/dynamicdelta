import CONSTANT from './constant';

export function CDNURL(pid, cid) {
  return `${CONSTANT.GLOBAL.API}/v1/cdn/project/${pid}/component/${cid}`;
}
