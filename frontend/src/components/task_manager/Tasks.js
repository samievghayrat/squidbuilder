import NewTask from "./NewTask.js";

export default function Tasks({onAdd, onDelete, tasks}) {
    return (
        <section>
            <h2 className='text-2xl font-bold text-stone-700 mb-4'>Responsibility</h2>
            <NewTask onAdd={onAdd}></NewTask>
            {tasks.length === 0 && (<p className="text-stone-800"> This activity does not have anny responsibilites yet</p>)
            }
            {tasks.length > 0 && <ul className='p-4 mt-8 rounded-md bg-stone-100'>
                {tasks.map((task) =>
                    <li key={task.id} className='flex justify-between my-4'>
                        <span>{task.text}</span>
                        <button className='text-stone-700 hover:text-red-500' onClick={()=>onDelete(task.id)}>Clear</button>
                    </li>)}
            </ul>}
        </section>
    )
}