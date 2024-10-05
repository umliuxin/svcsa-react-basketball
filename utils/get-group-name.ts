export function getGroupName(groupId: number): string {
  if(groupId === 0) {
    return '公开组'
  }
  if(groupId === 1) {
    return '竞技组'
  }
  return '公开组'
}