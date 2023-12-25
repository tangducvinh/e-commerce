import { Sidebar } from '../../companents'


const Home = () => {
    return (
        <div className="flex justify-center mt-[16px]">
            <div className="w-[1220px] flex gap-4">
                <div className="w-[220px] rounded-xl shadow-md">
                    <Sidebar />
                </div>
                <div className="flex-auto">banner</div>
                <div className="w-[260px]">quang cao</div>
            </div>
        </div>     
    )
}

export default Home