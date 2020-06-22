import React from 'react';
import { connect } from 'react-redux';

import Dialog from './Dialog';

const Dialogs = ({ rooms, users, toSearchFor, joinRoom }) => {

    return (
        <div className="dialogs">
            {
                toSearchFor !== '' ?
                    users.map((user, index) => {
                        if (user.login.includes(toSearchFor))
                            return <Dialog key={index} user={user} />
                    })
                    :
                    rooms.map((room, index) =>
                        <Dialog
                            key={index}
                            id={'dialog' + index}
                            roomId={room._id}
                            users={room.users}
                            joinRoom={joinRoom}
                        />)
            }
        </div>
    );
}

const mapStateToProps = state => ({
    rooms: state.chat.rooms,
    users: state.chat.users,
    toSearchFor: state.chat.toSearchFor
});

export default connect(mapStateToProps)(Dialogs);