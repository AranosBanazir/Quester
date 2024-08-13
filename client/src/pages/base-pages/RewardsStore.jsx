import { useLazyQuery } from '@apollo/client'
import { useRewardCartContext } from '../../utils/RewardCartContext'
import { QUERY_REWARDS_CHECKOUT } from '../../utils/queries'


import RewardList from '../../components/RewardList'
import RewardCard from '../../components/RewardCard'

const RewardsStore = () => {
  const { state } = useRewardCartContext()

  const [runCheckout] = useLazyQuery(QUERY_REWARDS_CHECKOUT)

  const handleCheckout = async () => {
    try {
      const response = await runCheckout({
        variables: {
          rewards: state.map(({ description, ...reward }) => {
            return {
              ...reward,
            }
          })
        }
      })

      const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
      stripe.redirectToCheckout({ sessionId: response.data.checkout.session })
    } catch(err) {
      console.log(err)
      alert('Error checking out!')
    }
  }

  const total = state.reduce((total, reward) => {
    return total + reward.points
  }, 0)

  return (
    <div className="container">
      <div className='flex-row space-between items-center'>
        <h1>Rewards</h1>
        <div>
          Total: ${total}
          <button onClick={handleCheckout} disabled={state.length === 0}>
            Checkout
          </button>
        </div>
      </div>
      <RewardList>
        {state.map(reward => {
          return (
            <RewardCard
              {...reward}
              key={reward._id}
            />
          )
        })}
      </RewardList>
    </div>
  )
}

export default RewardsStore;