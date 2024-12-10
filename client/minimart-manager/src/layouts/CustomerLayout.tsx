import { ReactNode, useState } from 'react';
import CustomerHeader from './Header/CustomerHeader';
import CustomerFooter from './Footer/CustomerFooter';
import CartDialog from '../components/Dialog/CartDialog';

const CustomerLayout = ({ children }: { children: ReactNode }) => {
    const [cartDialogOpen, setCartDialogOpen] = useState(false);


    return (

        <>

            <div className={`flex flex-col w-full bg-white`}>
                <CustomerHeader onCartOpen={() => { setCartDialogOpen(true) }} />
                <div className={`flex flex-col h-full overflow-y-auto w-full`}>
                    <div className='w-full h-full'>
                        <div className='px-10'>
                            {children}
                        </div>

                        <div className='w-vh mt-10 '>
                            <CustomerFooter />
                        </div>

                    </div>

                </div>


            </div>

            <CartDialog open={cartDialogOpen} onClose={()=>setCartDialogOpen(false)}/>
        </>

    );
};

export default CustomerLayout;
