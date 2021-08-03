import React from 'react'

function FileUpload({children}) {
    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700">Upload file</label>
                <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
                    {children}
                </div>
            </div>
        </div>
)
}

export default FileUpload
