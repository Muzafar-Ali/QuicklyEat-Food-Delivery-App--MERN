
const Orderitems = ({item}: {item: any}) => {
  return (
    <div>
      <div className='flex flex-row items-center gap-2 md:gap-5 py-2'>
        <img src={item.menuItemId.image} className='w-10 h-10 rounded-lg border border-white border-opacity-50 ' />
        <div className="flex items-center gap-2">
          <h1 className="text-base">{item.menuItemId.title}</h1>
        </div>
        <h1 className="text-base">$ {item.menuItemId.price}</h1>
        <h1 className="text-base">qty: {item.quantity}</h1>
      </div>
    </div>
  )
}

export default Orderitems