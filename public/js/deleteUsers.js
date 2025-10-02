document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", async function () {
            const userId = button.dataset.id;
            if (confirm("Eliminare questo account?")) {
                try {
                    const response = await fetch(`/delete_users/${userId}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        button.closest('.box').remove();
                    } else {
                        alert("Errore durante l'eliminazione dell'utente");
                    }
                } catch (error) {
                    console.error("Errore durante l'eliminazione dell'utente:", error);
                    alert("Si è verificato un errore, riprova più tardi.");
                }
            }
        });
    });
});