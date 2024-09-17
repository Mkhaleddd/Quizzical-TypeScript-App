

const Skeleton = () => {
  return (
    <>

     <section  aria-label='skeletion UI'>
      {Array.from({length:3}).map((_,i)=>(
        <div className="container skeleton" key={i}>
          <h3></h3>
          <div>
            {Array.from({length:4}).map((_,i)=>(
              <p key={i}></p>
            ))}
          </div>  
       </div>
      ))}
     </section>
    </>
  )
}

export default Skeleton