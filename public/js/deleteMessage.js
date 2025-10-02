document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", async function () {
            const messageId = this.dataset.id;
            if (confirm("Eliminare questo messaggio?")) {
                try {
                    const response = await fetch(`/delete_messages/${messageId}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        button.closest('.box').remove();
                    } else {
                        alert("Errore durante l'eliminazione del messaggio");
                    }
                } catch (error) {
                    console.error("Errore durante l'eliminazione del messaggio:", error);
                    alert("Si è verificato un errore, riprova più tardi.");
                }
            }
        });
    });
});