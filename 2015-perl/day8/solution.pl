use strict;
use warnings;
use Data::Dumper;

my @aLines = ();
open(my $fh, '<', 'input.txt');
while(defined(my $sLine = <$fh>)) {
  chomp($sLine);
  push(@aLines, $sLine);
}
close($fh);

sub one {
  my $sTotalChars = 0;
  my $sEvalChars = 0;

  foreach my $sLine (@aLines) {

    my $sEvalLine = eval($sLine);

    $sTotalChars += length($sLine);
    $sEvalChars += length($sEvalLine);
  }

  return $sTotalChars - $sEvalChars;
}

sub two {
  my $sOriginalChars = 0;
  my $sNewChars = 0;

  foreach my $sLine (@aLines) {

    $sOriginalChars += length($sLine);

    # Handle backslashes
    $sLine =~ s/\\/\\\\/g;

    # Handle quotes
    $sLine =~ s/"/\\"/g;

    # Add quotes
    $sLine =~ s/^(.*)$/\"$1\"/;

    $sNewChars += length($sLine);
  }

  return $sNewChars - $sOriginalChars;
}

print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
