export default (status) => {
  switch (status) {
    case 1:
      return '运行中';
    case 0:
      return '已下线';
    default:
      return '';
  }
}