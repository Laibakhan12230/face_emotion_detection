export default function ConfidenceMeter({confidence}){

    return(

        <div className="mt-5">

            <p className="text-white mb-2">
                AI Confidence
            </p>

            <div className="w-full bg-gray-700 rounded-full h-5 overflow-hidden">

                <div
                    className="bg-green-500 h-5 rounded-full transition-all duration-500"
                    style={{width:`${confidence*100}%`}}
                >

                </div>

            </div>

        </div>

    )
}