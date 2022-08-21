import { AiOutlineEdit as EditIcon, AiOutlineDelete as DeleteIcon } from 'react-icons/ai';

export default function FlashCardItem({
    children: flashCard,
    onDelete = null,
    onEdit = null,
}) {
    const { title, description } = flashCard;

    function handleDeleteIconClick() {
        if (onDelete)
            onDelete(flashCard.id);
    }

    function handleEditIconClick() {
        if (onEdit)
            onEdit(flashCard);
    }

    return (
        <div className="border p-2 m-2">
            <ul className="flex flex-col space-y-2">
                <li>
                    <strong>Título:</strong> <span>{title}</span>
                </li>
                <li>
                    <strong>Descrição:</strong> <span>{description}</span>
                </li>
            </ul>
            <div className='flex felx-row items-center justify-end mt-4 space-x-4'>
                <EditIcon onClick={handleEditIconClick} size={24} className='cursor-pointer' />
                <DeleteIcon onClick={handleDeleteIconClick} size={24} className='cursor-pointer' />
            </div>
        </div>
    );
}
