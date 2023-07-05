import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type cardProps = {
  title?: string;
  subtitle?: string;
  icon: any;
}
export default function TransactionCard({ ...props }: cardProps) {
  return (
    <>
      <div className="flex justify-between items-center text-gray-800 bg-white shaodw-lg px-10 py-5">
        <div className="flex items-center gap-5">
          <FontAwesomeIcon icon={props.icon} className="text-5xl" />
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold">{props.title || 'Type'} </p>
            <p className="text-gray-500 text-sm">{props.subtitle || 'Sub Title'}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {/* <FontAwesomeIcon icon={faChevronRight} className="text-4xl ml-auto text-gray-500" /> */}
        </div>
      </div>

    </>

  )
}