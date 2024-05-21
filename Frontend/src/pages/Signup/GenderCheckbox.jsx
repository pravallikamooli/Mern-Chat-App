const GenderCheckbox = ({onCheckBoxChange,selectedGender}) => {
    return (
        <div className="flex">
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer ${selectedGender === 'female' ? "selected" :""}`}>
                    <span className="label-text text-slate-300">Female</span>
                    <input type="checkbox" className="checkbox border-slate-500" 
                    checked={selectedGender ==="female"}
                    onChange={()=>{onCheckBoxChange("female")}}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer ${selectedGender === 'male' ? "selected" :""}`}>
                    <span className="label-text text-slate-300">Male</span>
                    <input type="checkbox" className="checkbox border-slate-500" 
                    checked={selectedGender ==="male"}
                    onChange={()=>{onCheckBoxChange("male")}}
                    />
                </label>
            </div>
        </div>
    )
}
export default GenderCheckbox;