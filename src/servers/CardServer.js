const values = ['A',2,3,4,5,6,7,8,9,10,'J',"Q","K"]
const signs = ['S','C','H','D']

export default function CardServer(){
    const changeCard = () => {
        return {
            value: values[Math.floor(Math.random() * values.length)],
            sing: signs[Math.floor(Math.random() * signs.length)],
        }
    }

    const getCard = () => {
        return {
            value: values[Math.floor(Math.random() * values.length)],
            sign: signs[Math.floor(Math.random() * signs.length)],
        }
    }

    return {
        changeCard,
        getCard
    }
}