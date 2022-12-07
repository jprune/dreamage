import DashboardCard from './DashboardCard';

type Props = {}

// eslint-disable-next-line consistent-return
const Dashboard = (props: Props) => {
    const cardContent = [{
        name: 'Profile',
        url: 'profile',
        image: ''
    }, {
        name: 'Business Manager',
        url: 'businessmanager',
        image: ''
    }, {
        name: 'Photoshoot',
        url: 'photoshoot',
        image: ''
    }, {
        name: 'Galleries',
        url: 'galleries',
        image: ''
    }, {
        name: 'Print Shop',
        url: 'printshop',
        image: ''
    }, {
        name: 'Education & Resources',
        url: 'edures',
        image: ''
    }, {
        name: 'Directory',
        url: 'directory',
        image: ''
    }];
    
    return (
        <div className='flex flex-col md:flex-row flex-wrap justify-center mt-40 md:my-5 md:mx-5 gap-5'>
            {cardContent.map((item) => (
                <DashboardCard item={item} key={item.image}/>
            ))}
        </div>
    );
}; 

export default Dashboard;