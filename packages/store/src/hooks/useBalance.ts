import { useRecoilValue } from "recoil"
import { balanceAtom } from "../atoms/balance"


const useBalance = () => {

    const balance = useRecoilValue(balanceAtom);
    return balance;

}

export default useBalance;