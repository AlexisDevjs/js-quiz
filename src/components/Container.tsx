type ChildrenProp = {
  children: React.ReactNode
}

export default function Container ({ children }: ChildrenProp) {
  return (
    <div className='min-h-svh flex flex-col justify-between items-center p-4'>
      {children}
    </div>
  )
}
