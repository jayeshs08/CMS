import React from 'react'
import { useState } from 'react';

function InputForm() {
    const [ticketNo,setTicketNo]=useState(0);
    const [reqBy,setReqBy]=useState('');
    const [reqType,setReqType]=useState('');
    
  return (
    <form onSubmit={submit}>
        <label >
            Request By: 
            <input type="text" value={reqBy} onChange={e=>setReqBy(e.target.value)} />
        </label>
        <label >
            Request type: 
            <input type="text" />
        </label>
        <input type="submit" onClick={submit} />
    </form>
  )
}

export default InputForm