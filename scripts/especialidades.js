const especialidades = {
    "Terapia Neural": "Técnica terapéutica que utiliza anestésicos locales en puntos específicos del sistema nervioso para aliviar el dolor crónico y restaurar el equilibrio neurovegetativo.",
    "Quiropraxia": "Enfoque manual especializado en el diagnóstico y tratamiento de trastornos del sistema musculoesquelético, especialmente de la columna vertebral.",
    "Fisioterapia": "Tratamiento mediante ejercicios terapéuticos, electroterapia y técnicas manuales para recuperar la movilidad, fuerza y funcionalidad del cuerpo.",
    "Nutrición y Dietética": "Asesoría personalizada en alimentación saludable y planes nutricionales adaptados a las necesidades clínicas de cada paciente."
};

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".list-group-item-action");
    const descripcion = document.getElementById("espDescription");

    items.forEach((item) => {
        item.addEventListener("click", () => {
            items.forEach((i) => i.classList.remove("active"));
            item.classList.add("active");

            const nombre = item.dataset.especialidad;
            descripcion.textContent = especialidades[nombre] || "Seleccione una especialidad para ver su descripción.";
        });
    });

    if (items.length > 0) {
        items[0].click();
    }
});
