// page.tsx
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { TransactionProcess } from '@/components/(testquery)/transactionProcess';

export default function PP() {
    return (
        <div>
            <Header />
            <TransactionProcess
                lender="lender_address"
                borrower="borrower_address"
                amount={100}
                contract="contract_123"
                durationMonth={12}
                rate={5.0}
            />
            <Footer />
        </div>
    );
}
