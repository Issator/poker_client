import RoomItem from "./RoomItem";

export default function RoomList({rooms}){


    const showRoomList = () => {

        if(rooms.length == 0){
            return <h4 className="display-4 text-center mt-5">Brak pokoi</h4>
        }

        return rooms.map((room, index) => {
            return <RoomItem key={index} data={room}/>
        })
    }

    return (
        <div className="mt-2 mh-100">
            <div className="border border-2 p-2 rounded-2">
                <div className="room-list">
                    <div className="m-2">
                        {showRoomList()}
                    </div>
                </div>
            </div>
        </div>
    )
}