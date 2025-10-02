document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.getAttribute('data-id');

            if (confirm('Cancellare questo elemento?')) {
                try {
                    const response = await fetch(`/products/${productId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const productBox = document.getElementById(`product-${productId}`);
                        if (productBox) {
                            productBox.remove();
                        }
                    } else {
                        const result = await response.json();
                        alert(result.message || 'Errore durante l\'eliminazione del prodotto');
                    }
                } catch (error) {
                    console.error('Errore durante la richiesta di eliminazione:', error);
                    alert('Si è verificato un errore, riprova più tardi.');
                }
            }
        });
    });
});