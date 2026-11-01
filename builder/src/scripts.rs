pub fn client_script(email: &str) -> String {
    format!(
        r#"
(function() {{
  // Theme Toggle Engine
  var themeToggle = document.getElementById('theme-toggle');
  var currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {{
    themeToggle.addEventListener('click', function() {{
      var activeTheme = document.documentElement.getAttribute('data-theme');
      var newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }});
  }}

  // Native Dialog Modal Drawer Handler
  document.querySelectorAll('.js-open-drawer').forEach(function(btn) {{
    btn.addEventListener('click', function(e) {{
      e.preventDefault();
      var drawerId = btn.getAttribute('data-drawer');
      var dialog = document.getElementById(drawerId);
      if (dialog && typeof dialog.showModal === 'function') {{
        dialog.showModal();
        dialog.setAttribute('open', '');
      }}
    }});
  }});

  document.querySelectorAll('.drawer-close').forEach(function(btn) {{
    btn.addEventListener('click', function(e) {{
      e.preventDefault();
      var dialog = btn.closest('dialog');
      if (dialog) {{
        dialog.close();
        dialog.removeAttribute('open');
      }}
    }});
  }});

  document.querySelectorAll('dialog.project-drawer').forEach(function(dialog) {{
    dialog.addEventListener('click', function(e) {{
      var rect = dialog.getBoundingClientRect();
      var isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
        && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {{
        dialog.close();
        dialog.removeAttribute('open');
      }}
    }});
  }});

  // Dynamic Clipboard Copy & Toast Engine
  var copyBtns = document.querySelectorAll('.js-copy-email');
  var toast = document.getElementById('copy-toast');
  var toastMsg = document.getElementById('copy-toast-msg');
  var toastTimer = null;
  var emailAddress = '{email}';

  function triggerToast() {{
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = 'Copied to clipboard: ' + emailAddress;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {{
      toast.classList.remove('show');
    }}, 2600);
  }}

  function fallbackCopy(text) {{
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {{
      document.execCommand('copy');
      triggerToast();
    }} catch(err) {{}}
    document.body.removeChild(ta);
  }}

  copyBtns.forEach(function(btn) {{
    btn.addEventListener('click', function(e) {{
      e.preventDefault();
      if (navigator.clipboard && navigator.clipboard.writeText) {{
        navigator.clipboard.writeText(emailAddress).then(triggerToast).catch(function() {{
          fallbackCopy(emailAddress);
        }});
      }} else {{
        fallbackCopy(emailAddress);
      }}
    }});
  }});
}})();
"#,
        email = email
    )
}
