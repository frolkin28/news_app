import enum


class Role(enum.Enum):
    USER = enum.auto()
    EDITOR = enum.auto()

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]
