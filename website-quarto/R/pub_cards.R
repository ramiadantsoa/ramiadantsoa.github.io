library(tidyverse)
library(RefManageR)
library(htmltools)

`%||%` <- function(a, b) if (is.null(a) || length(a) == 0) b else a
nz_chr <- function(x) ifelse(is.na(x) | trimws(x) == "", NA_character_, x)

strip_braces <- function(x) {
  if (is.null(x) || length(x) == 0) return(NA_character_)
  gsub("[{}]", "", as.character(x), perl = TRUE)
}

fmt_authors_card <- function(entry) {
  au <- entry$author
  if (is.null(au) || length(au) == 0) return(NA_character_)
  pieces <- vapply(au, function(a) paste(as.character(a$family), collapse = " "), character(1))
  pieces <- pieces[nzchar(pieces)]
  if (!length(pieces)) return(NA_character_)
  if (length(pieces) == 1) pieces
  else paste(paste(pieces[-length(pieces)], collapse = ", "), "&", pieces[length(pieces)])
}

render_pubs <- function(bib_path = "publications.bib", topic = NULL) {
  bib <- ReadBib(bib_path, check = FALSE)
  keys <- names(bib)

  rows <- tibble(
    key   = keys,
    entry = lapply(keys, function(k) bib[k])
  ) |>
    mutate(
      title        = map_chr(entry, ~ strip_braces(.x$title %||% "")),
      authors_card = map_chr(entry, fmt_authors_card),
      year         = map_chr(entry, ~ as.character(.x$year %||% .x$date %||% "")),
      venue        = map_chr(entry, ~ strip_braces(.x$journal %||% .x$booktitle %||% "")),
      abstract     = map_chr(entry, ~ .x$abstract %||% NA_character_),
      keywords     = map_chr(entry, ~ tolower(as.character(.x$keywords %||% ""))),
      doi          = map_chr(entry, ~ .x$doi %||% NA_character_),
      url_fallback = map_chr(entry, ~ .x$url %||% NA_character_),
      bibtex       = map_chr(entry, ~ paste0(utils::toBibtex(.x), collapse = "\n")),
      doi_url      = if_else(!is.na(nz_chr(doi)), paste0("https://doi.org/", doi), url_fallback)
    )

  # Filter by topic keyword if provided
  if (!is.null(topic) && nzchar(topic)) {
    rows <- rows |> filter(grepl(tolower(topic), keywords, fixed = TRUE))
  }

  if (nrow(rows) == 0) {
    return(tags$p("No publications listed under this topic yet."))
  }

  cards <- pmap(rows, function(key, title, authors_card, year, venue, abstract, bibtex, doi_url, ...) {
    payloads <- tags$div(
      style = "display:none;",
      tags$div(class = "payload-abstract", abstract %||% ""),
      tags$div(class = "payload-bibtex",   bibtex   %||% "")
    )

    ttl_node <- if (isTRUE(nzchar(doi_url %||% ""))) {
      tags$div(class = "pub-title", tags$a(title, href = doi_url, target = "_blank", rel = "noopener"))
    } else {
      tags$div(class = "pub-title", title)
    }

    venue_year <- paste(
      c(if (nzchar(venue %||% "")) as.character(tags$em(venue)) else NULL,
        if (nzchar(year %||% "")) paste0("(", year, ")") else NULL),
      collapse = " "
    )

    meta <- tags$div(
      class = "pub-meta",
      if (nzchar(authors_card %||% "")) tagList(HTML(authors_card), tags$br()) else NULL,
      if (nzchar(venue_year)) HTML(venue_year) else NULL
    )

    actions <- tags$div(
      class = "pub-actions",
      tags$a("Abstract", href = "#", `data-action` = "abstract", role = "button"),
      tags$a("BibTeX",   href = "#", `data-action` = "bib",      role = "button")
    )

    toggle_panel <- tags$div(
      class = "toggle-area", `data-current` = "",
      tags$button(class = "copy-btn", "Copy"),
      tags$span(class = "copy-toast", "Copied!"),
      tags$div(class = "panel-label", "—"),
      tags$div(class = "content")
    )

    tags$div(class = "pub-card", id = key, `data-key` = key, ttl_node, meta, actions, toggle_panel, payloads)
  })

  browsable(tags$div(cards))
}