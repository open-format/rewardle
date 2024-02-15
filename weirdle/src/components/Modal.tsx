import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { FC, Fragment, ReactNode, useRef } from "react";

export type Props = {
  open: boolean;
  title: ReactNode;
  onClose(open: boolean): void;
  actionLabel?: string;
};

const Modal: FC<Props> = (props) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="overflow-none fixed inset-0 z-10"
        initialFocus={cancelButtonRef}
        onClose={props.onClose}
      >
        <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="backdrop-blur-xs fixed inset-0 bg-gray-500/50 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={clsx(
                "relative inline-block transform overflow-hidden rounded-2xl text-left align-bottom shadow-xl",
                "transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
              )}
            >
              <div className="bg-background px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h2">{props.title}</Dialog.Title>
                    <div className="grid w-full pt-4">{props.children}</div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="absolute right-0 top-0 m-1 h-8 w-8 rounded-full bg-gray-300/30 transition-colors hover:bg-gray-300 md:m-3"
                onClick={props.onClose.bind(null, false)}
              >
                <XCircleIcon />
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
