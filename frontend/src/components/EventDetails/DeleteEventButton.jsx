import {useState } from "react";
import { Button } from "primereact/button";
import axios from "axios";


function DeleteEventButton({eventDetail, setDeleteChannelInformation}) {
    const [showMessage, setShowMessage] = useState(false);

    const deleteEvent= function () {
        let event_id = eventDetail.id
		axios.put('/event/delete',{id:event_id})
			.then((response)=> {
				console.log('delete event response.data', response.data)
                let channelId = "EventChatroom";
                let channelName = eventDetail.name
                channelName += " Chatroom";
                let code = eventDetail.code
                channelId += code.toString();
                setDeleteChannelInformation([channelId,channelName])
            })
    }

	const hideDetails = () => {
		setShowMessage(false);
	};

    const dialogFooter = (
		<Container as={myRow} className="flex justify-content-center">
			<Col>
				<Button
					label="Delete"
					icon="pi pi-trash"
					className="p-button-outlined"
					autoFocus
					onClick={() =>
						deleteEvent()
					}
				/>
			</Col>
			<Col></Col>
			<Col>
				<Button
					label="No"
					icon="pi pi-times"
					className="p-button-outlined"
					onClick={() =>
						hideDetails()
					}
				/>
			</Col>
		</Container>
	);

            
        return(
            <>
            <Button label="Delete" icon="pi pi-trash" className="p-button-text" onClick={()=>{setShowMessage(true)}}/>
            {/* <Button onClick={() => showDetails(invitation)}>Show Details</Button> */}
            <Dialog
				visible={showMessage}
				onHide={hideDetails}
				showHeader={true}
				header="Delete Event?"
				footer={dialogFooter}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<p style={{ lineHeight: 1.5 }}>Deleting this event will delete it for all attendees, are you sure you want to delete this event?</p>
				</div>
			</Dialog>
            </>
        )

}

export default DeleteEventButton