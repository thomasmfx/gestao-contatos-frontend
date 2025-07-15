import { toast, type ToastType } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

function useNotify() {
  const notify = (type: ToastType, msg: string) => {
    toast(msg, {
      theme: 'light',
      type: type,
      hideProgressBar: true,
      position: 'top-center',
      dangerouslyHTMLString: true,
      autoClose: 2000,
      transition: 'slide',
    });
  };

  return notify;
}

export default useNotify;
