import { Footer } from '@/components/Footer';
import BorrowDashboard from '../../components/(borrowdashboard)/BDashboard';
import { Header } from '@/components/Header';

export default function Borrowing() {
    return (
        <div>
            <Header />
            <BorrowDashboard />
            <Footer />
        </div>
    )
}