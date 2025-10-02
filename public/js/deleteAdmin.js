document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const adminId = button.dataset.id;

            if (confirm('Eliminare questo account?')) {
                try {
                    const response = await fetch(`/delete_admin/${adminId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        button.closest('.box').remove();
                    } else {
                        const data = await response.json();
                        alert(data.message || 'Errore durante l\'eliminazione dell\'admin.');
                    }
                } catch (error) {
                    console.error('Errore durante l\'eliminazione dell\'admin:', error);
                    alert('Si è verificato un errore, riprova più tardi.');
                }
            }
        });
    });
});
