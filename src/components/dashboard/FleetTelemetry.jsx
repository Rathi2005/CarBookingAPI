function FleetTelemetry(){

return(

<section className="
rounded-2xl
border
border-slate-200
bg-white
p-5
shadow-sm
">


<div className="flex flex-wrap items-center gap-4">


<h3 className="
text-sm
font-extrabold
text-slate-700
">

Fleet Telemetry

</h3>



<div className="
rounded-xl
bg-emerald-50
px-4
py-2
text-xs
font-bold
text-emerald-700
">

🟢 3 Cars Available

</div>



<div className="
rounded-xl
bg-blue-50
px-4
py-2
text-xs
font-bold
text-blue-700
">

🔵 1 On Trip

</div>



<div className="
rounded-xl
bg-slate-100
px-4
py-2
text-xs
font-bold
text-slate-600
">

⚪ 0 Maintenance

</div>


</div>


</section>

)

}


export default FleetTelemetry;