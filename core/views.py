from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .models import Project, Skill, ContactMessage
from .forms import ContactForm


def home(request):
    projects = Project.objects.all()
    featured_projects = projects.filter(featured=True)[:3]
    all_projects = projects

    skills_by_category = {}
    for skill in Skill.objects.all():
        # Django generates this method dynamically, so access it defensively for
        # static type checkers that cannot see generated model methods.
        get_category_display = getattr(skill, 'get_category_display', None)
        cat_label = (
            get_category_display() if callable(get_category_display)
            else str(skill.category)
        )
        if cat_label not in skills_by_category:
            skills_by_category[cat_label] = []
        skills_by_category[cat_label].append(skill)

    contact_form = ContactForm()

    if request.method == 'POST':
        contact_form = ContactForm(request.POST)
        if contact_form.is_valid():
            msg = ContactMessage(
                name=contact_form.cleaned_data['name'],
                email=contact_form.cleaned_data['email'],
                subject=contact_form.cleaned_data['subject'],
                message=contact_form.cleaned_data['message'],
            )
            msg.save()

            try:
                send_mail(
                    subject=f"Portfolio contact: {contact_form.cleaned_data['subject']}",
                    message=f"From: {contact_form.cleaned_data['name']} <{contact_form.cleaned_data['email']}>\n\n{contact_form.cleaned_data['message']}",
                    from_email=contact_form.cleaned_data['email'],
                    recipient_list=['tishapatiencemalongo@gmail.com'],
                    fail_silently=True,
                )
            except Exception:
                pass

            messages.success(request, "Message sent! I'll get back to you soon.")
            return redirect('home')
        else:
            messages.error(request, "Please fix the errors below.")

    context = {
        'featured_projects': featured_projects,
        'all_projects': all_projects,
        'skills_by_category': skills_by_category,
        'contact_form': contact_form,
    }
    return render(request, 'core/home.html', context)
