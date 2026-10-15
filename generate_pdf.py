import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle

def build_pdf():
    pdf_path = "public/cv.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    primary_color = colors.HexColor("#0e639c") # VS Code Blue
    dark_color = colors.HexColor("#1e1e1e")
    text_color = colors.HexColor("#2d2d2d")
    muted_color = colors.HexColor("#555555")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=dark_color,
        spaceAfter=4
    )

    contact_style = ParagraphStyle(
        'ContactText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=muted_color
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=primary_color,
        spaceBefore=10,
        spaceAfter=4
    )

    job_title = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=dark_color
    )

    job_meta = ParagraphStyle(
        'JobMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=muted_color,
        alignment=2 # Right align
    )

    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=text_color,
        spaceAfter=4
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_color,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2
    )

    story = []

    # Header
    story.append(Paragraph("ENRIQUE NAVARRETE-AMADO SÁNCHEZ", title_style))
    contact_info = (
        "enriquenavarrete3000@gmail.com &bull; +34 691 178 855 &bull; Monóvar, Alicante<br/>"
        "LinkedIn: linkedin.com/in/enrique-nav/ &bull; GitHub: github.com/Enrique002 &bull; GitLab: gitlab.com/Enrique002"
    )
    story.append(Paragraph(contact_info, contact_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceAfter=8))

    # Resumen
    story.append(Paragraph("RESUMEN PROFESIONAL", section_heading))
    resumen_text = (
        "Técnico Superior en Desarrollo de Aplicaciones Web (DAW) y Técnico en Sistemas Microinformáticos y Redes (SMR), "
        "con experiencia en desarrollo web y soporte informático. Me interesa especialmente el desarrollo de aplicaciones web, "
        "tanto en frontend como en backend, y seguir ampliando mis conocimientos en tecnologías de vanguardia."
    )
    story.append(Paragraph(resumen_text, body_style))
    story.append(Spacer(1, 4))

    # Experiencia Laboral
    story.append(Paragraph("EXPERIENCIA LABORAL", section_heading))

    # Job 1
    t1 = Table([[
        Paragraph("<b>Desarrollador Web</b> | Garmo Contact Center", job_title),
        Paragraph("Monóvar, Alicante | 01/11/2025 - 31/07/2026", job_meta)
    ]], colWidths=[340, 200])
    t1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t1)
    story.append(Spacer(1, 3))
    
    j1_bullets = [
        "Desarrollo y mantenimiento de aplicaciones web en entornos front-end y back-end.",
        "Diseño e implementación de interfaces de usuario responsivas, mejorando la experiencia de uso.",
        "Desarrollo de nuevas funcionalidades web utilizando Node.js, Angular y Bootstrap.",
        "Maquetación, pruebas y validación de componentes web.",
        "Corrección de errores y mantenimiento de aplicaciones existentes.",
        "Colaboración con el equipo de desarrollo en la implementación de nuevas funcionalidades.",
        "Optimización y mejora del rendimiento y la usabilidad de las aplicaciones web."
    ]
    for b in j1_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 6))

    # Job 2
    t2 = Table([[
        Paragraph("<b>Programador Web</b> | Neo Franquicias", job_title),
        Paragraph("Elda, Alicante | 01/02/2025 - 24/10/2025", job_meta)
    ]], colWidths=[340, 200])
    t2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t2)
    story.append(Spacer(1, 3))

    j2_bullets = [
        "Desarrollo y mantenimiento de aplicaciones y funcionalidades web.",
        "Desarrollo de interfaces de usuario adaptadas a distintos dispositivos y resoluciones.",
        "Implementación de funcionalidades utilizando Node.js, Angular y Bootstrap.",
        "Integración y modificación de componentes front-end y back-end.",
        "Realización de pruebas y validación del correcto funcionamiento de las funcionalidades desarrolladas.",
        "Identificación y corrección de errores en las aplicaciones web.",
        "Colaboración con el equipo de desarrollo en la planificación e implementación de mejoras."
    ]
    for b in j2_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 6))

    # Job 3
    t3 = Table([[
        Paragraph("<b>Técnico/a Informático/a</b> | OrthoLab", job_title),
        Paragraph("Elda, Alicante | 28/02/2022 - 10/09/2022", job_meta)
    ]], colWidths=[340, 200])
    t3.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t3)
    story.append(Spacer(1, 3))

    j3_bullets = [
        "Soporte técnico a usuarios y resolución de incidencias de hardware y software.",
        "Instalación, configuración y mantenimiento de equipos informáticos y periféricos.",
        "Migración y configuración de sistemas operativos, incluyendo entornos Windows.",
        "Administración de sistemas y usuarios en entornos corporativos.",
        "Gestión de incidencias relacionadas con redes, impresoras y conectividad.",
        "Uso de herramientas de acceso remoto para asistencia técnica.",
        "Colaboración en tareas de mantenimiento y mejora de la infraestructura IT."
    ]
    for b in j3_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 8))

    # Educación
    story.append(Paragraph("EDUCACIÓN Y FORMACIÓN", section_heading))
    
    edu_list = [
        ("<b>Técnico Superior en Desarrollo de Aplicaciones Web (DAW)</b>", "IES Enric Valor", "10/09/2023 - 12/06/2025"),
        ("<b>Técnico en Sistemas Microinformáticos y Redes (SMR)</b>", "IES Enric Valor", "10/09/2020 - 12/06/2022"),
        ("<b>Bachillerato</b>", "IES Enric Valor", "10/09/2018 - 12/06/2020")
    ]
    for e_title, e_school, e_date in edu_list:
        te = Table([[
            Paragraph(f"{e_title} — {e_school}", job_title),
            Paragraph(e_date, job_meta)
        ]], colWidths=[380, 160])
        te.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
        story.append(te)
        story.append(Spacer(1, 3))

    story.append(Spacer(1, 6))

    # Habilidades
    story.append(Paragraph("HABILIDADES Y COMPETENCIAS", section_heading))
    
    skills_data = [
        ("Desarrollo Web:", "JavaScript, Front-end, Back-end, HTML5, CSS, Angular, Node.js, Java, jQuery, JSON, Docker"),
        ("Sistemas e IT:", "Administración de Sistemas, Redes Informáticas, Soporte Técnico, Windows / Server, Linux, Active Directory, Virtualización"),
        ("Bases de Datos y Seguridad:", "Bases de Datos, PHP, MySQL, Ciberseguridad Informática"),
        ("Idiomas:", "Español (Lengua materna)"),
        ("Habilidades Adicionales:", "Trabajo en equipo, Resolución de problemas, Comunicación eficaz, Adaptación a entornos cambiantes, Organización y gestión del tiempo")
    ]

    for category, items in skills_data:
        p_text = f"<b>{category}</b> {items}"
        story.append(Paragraph(p_text, body_style))

    doc.build(story)
    print("CV PDF built successfully.")

if __name__ == "__main__":
    build_pdf()
