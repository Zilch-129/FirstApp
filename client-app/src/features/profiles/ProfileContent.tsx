import { Tab, TabPane } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({profile} : Props) {
    const panes = [
        {menuItem: 'About', render: () => <TabPane> About content</TabPane>},
        {menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/>},
        {menuItem: 'Events', render: () => <TabPane> Events content</TabPane>},
        {menuItem: 'Followers', render: () => <TabPane> Followers content</TabPane>},
        {menuItem: 'Following', render: () => <TabPane> Following content</TabPane>},
    ];

    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition="right"
            panes={panes}
        />
    )
})