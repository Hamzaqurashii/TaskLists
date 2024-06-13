export interface saveReqTask {
  title: string;
  description: string;
  isCompleted: boolean;
}
export interface updateReqTask {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface deleteReqTask {
  _id: string;
}
export interface getReqTask {
  _id: string;
}
