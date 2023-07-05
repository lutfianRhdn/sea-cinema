'use client'
import { faCheckCircle, faCircleExclamation, faCircleInfo, faCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TostProps = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClick: () => void;
};

export default function Tost({ message, type, onClick }: TostProps) {
  return (
    <>

      <div className="max-w-xs flex flex-row-reverse bg-white border rounded-md slide-left shadow-lg absolute  right-10 top-20" role="alert">
        <div>
          <button className="mx-2 py-2" type="button" >
            <FontAwesomeIcon icon={faXmark} className="w-6 h-6 text-gray-200" onClick={onClick} />
          </button>
        </div>
        <div className="flex px-6 py-4 justy-center items-center">
          <div className="flex-shrink-0">
            {type === 'success' && (
              <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-green-400" />
            )}
            {type === 'error' && (
              <FontAwesomeIcon icon={faCircleXmark} className="w-6 h-6 text-red-400" />
            )}

            {type === 'warning' && (
              <FontAwesomeIcon icon={faCircleExclamation} className="w-6 h-6 text-orange-400" />
            )}

            {type === 'info' && (
              <FontAwesomeIcon icon={faCircleInfo} className="w-6 h-6 text-blue-400" />
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              {message}
            </p>
          </div>

        </div>
      </div>
    </>


  )
}